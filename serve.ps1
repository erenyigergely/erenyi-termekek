# Egyszerű statikus fájlszerver előnézethez (nincs Node/Python a gépen).
param(
    [int]$Port = 8421
)

$root = $PSScriptRoot
Add-Type -AssemblyName System.Web

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$Port/"

$mime = @{
    '.html'='text/html; charset=utf-8'; '.htm'='text/html; charset=utf-8'
    '.css'='text/css'; '.js'='application/javascript'
    '.json'='application/json'
    '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.png'='image/png'; '.svg'='image/svg+xml'
    '.gif'='image/gif'; '.webp'='image/webp'
    '.mov'='video/quicktime'; '.mp4'='video/mp4'
    '.ico'='image/x-icon'
}

while ($listener.IsListening) {
    try {
        $ctx = $listener.GetContext()
    } catch { break }

    $req = $ctx.Request
    $res = $ctx.Response
    try {
        $path = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
        if ($path -eq '/') { $path = '/index.html' }
        $filePath = Join-Path $root ($path.TrimStart('/'))

        if (Test-Path $filePath -PathType Container) {
            $filePath = Join-Path $filePath 'index.html'
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $ct = $mime[$ext]
            if (-not $ct) { $ct = 'application/octet-stream' }
            $res.ContentType = $ct

            $stream = [System.IO.File]::OpenRead($filePath)
            $res.ContentLength64 = $stream.Length

            # egyszerű Range támogatás videóhoz (seek)
            $rangeHeader = $req.Headers['Range']
            if ($rangeHeader -and $rangeHeader.StartsWith('bytes=')) {
                $range = $rangeHeader.Substring(6).Split('-')
                $start = [int64]$range[0]
                $end = if ($range[1]) { [int64]$range[1] } else { $stream.Length - 1 }
                $len = $end - $start + 1
                $res.StatusCode = 206
                $res.AddHeader('Content-Range', "bytes $start-$end/$($stream.Length)")
                $res.ContentLength64 = $len
                $stream.Seek($start, 'Begin') | Out-Null
                $buffer = New-Object byte[] 65536
                $remaining = $len
                while ($remaining -gt 0) {
                    $toRead = [Math]::Min($buffer.Length, $remaining)
                    $read = $stream.Read($buffer, 0, $toRead)
                    if ($read -le 0) { break }
                    $res.OutputStream.Write($buffer, 0, $read)
                    $remaining -= $read
                }
            } else {
                $res.AddHeader('Accept-Ranges', 'bytes')
                $stream.CopyTo($res.OutputStream)
            }
            $stream.Close()
        } else {
            $res.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
    } catch {
        try {
            $res.StatusCode = 500
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("500: $_")
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch {}
    } finally {
        $res.OutputStream.Close()
    }
}
