#!/bin/bash

echo "====================================="
echo " Rhombix Technologies Linux Project "
echo "====================================="

echo ""
echo "User:"
whoami

echo ""
echo "Current Directory:"
pwd

echo ""
echo "Ubuntu Version:"
lsb_release -ds

echo ""
echo "Kernel:"
uname -r

echo ""
echo "Memory:"
free -h

echo ""
echo "Disk Usage:"
df -h /

echo ""
echo "System Information Complete."
