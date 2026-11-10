@echo off
cd /d "%~dp0"
if not exist "node_modules" (
  echo Instalando dependencias...
  call npm.cmd install
)
echo Iniciando servidor em http://localhost:3000 ...
call npm.cmd start
pause
