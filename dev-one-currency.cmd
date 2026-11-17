@echo off
REM Use Node 20 when default "nodejs" folder is still v18 (see SETUP-NODE.md)
set "NODE20=C:\Program Files\nodejs14"
if not exist "%NODE20%\node.exe" set "NODE20=C:\Program Files\nodejs"
set "PATH=%NODE20%;%PATH%"
cd /d "%~dp0"
echo Using Node:
node -v
pnpm dev:one-currency
