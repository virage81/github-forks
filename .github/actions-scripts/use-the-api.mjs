on:
  workflow_dispatch:
jobs:
  use_api_via_script:
    permissions: {}
    steps:
        env:
          TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          node .github/actions-scripts/use-the-api.mjs