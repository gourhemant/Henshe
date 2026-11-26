@echo off
setlocal enabledelayedexpansion
title HENSHE EV - Auto Deploy to GitHub
color 0A

:: Ensure script always runs in its own directory
cd /d "%~dp0"

echo ======================================================================
echo          ⚡ HENSHE EV Mobility - One-Click GitHub Auto Sync ⚡
echo ======================================================================
echo Current Directory: %cd%
echo Target Remote: https://github.com/gourhemant/Henshe.git
echo.

:: Check Git installation
where git >nul 2>nul
if %errorlevel% neq 0 (
  echo [ERROR] Git is not installed or not in PATH!
  pause
  exit /b 1
)

echo [1/4] Staging all updated files...
git add -A

echo.
echo [2/4] Committing updates...
git commit -m "Deploy: Cyber Stealth theme, interactive 3D showcase & 250/day pricing" 2>nul || echo Working tree already clean or committed.

echo.
echo [3/4] Pushing to GitHub (main branch)...
git push -u origin main --force
if %errorlevel% neq 0 (
  echo.
  echo [WARNING] Push to 'main' encountered an issue. Trying 'master' branch...
  git push origin main:master --force
) else (
  :: Also mirror to master branch just in case GitHub Pages is set to 'master'
  git push origin main:master --force 2>nul
)

echo.
echo [4/4] Verifying remote status...
git remote -v

echo.
echo ======================================================================
echo  🚀 All done!
echo  🌐 Live Website: https://gourhemant.github.io/Henshe/
echo.
echo  NOTE: If you still see the old site, press Ctrl + Shift + R
echo  (or Ctrl + F5) in your browser to clear cache, or wait 60 seconds
echo  for GitHub Pages to finish building!
echo ======================================================================
echo.
pause
