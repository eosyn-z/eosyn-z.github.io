@echo off
echo ========================================
echo 🔨 EOSYN.NET Site Builder
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm packages are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
)

REM Run the build
echo 🔨 Building site manifest and gallery...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Build completed successfully!
    echo.
    echo 📝 What was built:
    echo    - data/manifest.json (all your content pages)
    echo    - data/gallery.json (art gallery data)
    echo    - data/sites.json (bookmarked sites)
    echo.
    echo 💡 Next steps:
    echo    1. Test locally: Open index.html in browser
    echo    2. Push to GitHub: git add -A ^&^& git commit -m "Update content" ^&^& git push
    echo    3. GitHub Actions will auto-deploy to your site
) else (
    echo.
    echo ❌ Build failed! Check the error messages above.
)

echo.
pause