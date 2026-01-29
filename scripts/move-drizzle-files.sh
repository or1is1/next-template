#!/bin/bash

# schema.ts 이동
if [ -f "drizzle/schema.ts" ]; then
  mv drizzle/schema.ts src/lib/db/schema.ts
  echo "✓ schema.ts moved from drizzle/ to src/lib/db/schema.ts"
fi

# relations.ts 이동
if [ -f "drizzle/relations.ts" ]; then
  mv drizzle/relations.ts src/lib/db/relations.ts
  echo "✓ relations.ts moved from drizzle/ to src/lib/db/relations.ts"
fi

