@echo off
REM Slides-dev — hub first on :4000. Node 20: see SETUP-NODE.md
set "NODE20=C:\Program Files\nodejs14"
if not exist "%NODE20%\node.exe" set "NODE20=C:\Program Files\nodejs"
set "PATH=%NODE20%;%PATH%"
cd /d "%~dp0"

echo.
node -v
echo.

if /i "%~1"=="serve" goto SERVE_ONLY
if /i "%~1"=="fast" goto HUB
if /i "%~1"=="full" goto FULL
if /i "%~1"=="watch" goto WATCH
if /i "%~1"=="build" goto BUILD
if /i "%~1"=="dev" goto DEV
if /i "%~1"=="data" goto DATA
if not "%~1"=="" goto DEV_ARGS

REM Default: hub menu (no full rebuild)
echo === Slide hub ===
echo http://127.0.0.1:4000/
echo Build decks: start.cmd build -- --latest --with-ref
echo Full rebuild: start.cmd full
echo.
pnpm hub
goto END

:HUB
pnpm hub
goto END

:FULL
echo === Build ALL decks then hub ===
pnpm start:hub
goto END

:SERVE_ONLY
pnpm serve:hub
goto END

:WATCH
pnpm start:local
goto END

:BUILD
shift
pnpm build:deck %1 %2 %3 %4 %5 %6 %7 %8 %9
goto END

:DEV
shift
pnpm dev:deck %1 %2 %3 %4 %5
goto END

:DEV_ARGS
pnpm dev:deck %*
goto END

:DATA
pnpm data:fx
goto END

:END