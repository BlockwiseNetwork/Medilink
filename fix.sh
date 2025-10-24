#!/bin/bash

echo "🛠️ Fixing MediLink build setup..."

# Remove the old use-auth hook if it exists
if [ -f src/hooks/use-auth.ts ]; then
    rm src/hooks/use-auth.ts
    echo "✅ Removed old use-auth hook."
fi

echo "🚀 Build setup cleanup complete."
echo "You can now commit the changes and redeploy to Netlify."

