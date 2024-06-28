#!/usr/bin/bash
set -e
for i in `seq 0 100`;
	do wget  127.0.0.1:4444 && break || echo waiting && sleep 5;
done

yarn run wdio
