@echo off
title HENSHE EV - Auto Deploy to GitHub
color 0A
echo ======================================================================
echo          ⚡ HENSHE EV Mobility - One-Click GitHub Auto Sync ⚡
echo ======================================================================
echo.
echo [1/3] Staging all updated files (Cyber Stealth, 3D Showcase, Pricing)...
git add .

echo.
echo [2/3] Creating commit...
git commit -m "Deploy: Cyber Stealth theme with interactive 3D showcase and 250/day pricing" 2>nul || echo Working tree already clean.

echo.
echo [3/3] Pushing to GitHub (gourhemant/Henshe)...
git push -u origin main --force

echo.
echo ======================================================================
echo  🚀 Done! Your GitHub repository is updated.
echo  🌐 Live Website: https://gourhemant.github.io/Henshe/
echo ======================================================================
echo.
pause
