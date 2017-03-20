#!/usr/bin/env bash
swift build
./.build/debug/Application env=dev
