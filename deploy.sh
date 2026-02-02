#!/bin/bash

# Deployment script for Singitpop website
# This script attempts multiple methods to push changes to GitHub

echo "🚀 Singitpop Deployment Script"
echo "================================"

# Method 1: Try standard git push
echo ""
echo "Method 1: Standard git push..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Push successful!"
    echo "Vercel will auto-deploy in ~2-3 minutes"
    echo "Check: https://vercel.com/dashboard"
    exit 0
fi

# Method 2: Try with increased buffer
echo ""
echo "Method 2: Trying with increased buffer..."
git config http.postBuffer 524288000
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Push successful!"
    echo "Vercel will auto-deploy in ~2-3 minutes"
    exit 0
fi

# Method 3: Try with SSH (if configured)
echo ""
echo "Method 3: Trying with SSH..."
git remote set-url origin git@github.com:singitpop/singitpop-club.git
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Push successful!"
    echo "Vercel will auto-deploy in ~2-3 minutes"
    # Restore HTTPS URL
    git remote set-url origin https://singitpop@github.com/singitpop/singitpop-club.git
    exit 0
fi

# Restore HTTPS URL if SSH failed
git remote set-url origin https://singitpop@github.com/singitpop/singitpop-club.git

echo ""
echo "❌ All push methods failed"
echo ""
echo "Manual deployment options:"
echo "1. Use GitHub Desktop to push"
echo "2. Go to Vercel Dashboard → Redeploy WITHOUT cache"
echo "3. Try: git push origin main --force"
echo ""
