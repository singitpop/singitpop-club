#!/bin/bash

# AWS S3 Configuration Script
# This will add your AWS credentials to .env.local

echo ""
echo "🔐 AWS S3 Configuration"
echo "======================="
echo ""
echo "This script will add your AWS credentials to .env.local"
echo ""

# Backup existing .env.local
if [ -f .env.local ]; then
    cp .env.local .env.local.backup
    echo "✅ Backed up existing .env.local to .env.local.backup"
fi

# Add AWS credentials
cat >> .env.local << 'EOF'

# AWS S3 Configuration for Music Storage
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY_HERE
AWS_REGION=us-east-1
AWS_S3_BUCKET=singitpop-music
EOF

echo ""
echo "✅ AWS configuration added to .env.local"
echo ""
echo "⚠️  IMPORTANT: You need to edit .env.local and replace:"
echo "   - YOUR_ACCESS_KEY_HERE with your actual access key"
echo "   - YOUR_SECRET_KEY_HERE with your actual secret key"
echo ""
echo "To edit the file:"
echo "   open .env.local"
echo ""
echo "Or use a text editor:"
echo "   nano .env.local"
echo ""
