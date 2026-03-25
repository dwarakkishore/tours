#!/bin/bash
# Run this script to set a 7-day cache on all your Firebase Storage objects.
# Ensure you have the gsutil CLI installed and authenticated.

echo "Setting Cache-Control headers for Firebase Storage..."
gsutil -m setmeta -h "Cache-Control:public, max-age=604800" "gs://bayard-43e94.firebasestorage.app/**"
echo "Done!"
