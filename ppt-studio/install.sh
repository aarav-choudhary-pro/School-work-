#!/bin/bash
# Restore environment after sandbox reset (run every turn)
pip install --break-system-packages -q python-pptx pypdfium2 pillow
echo "env ready"
