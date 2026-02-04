# Viteの開発に適したNode.jsイメージ
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# 必要に応じてOSレベルのパッケージを追加（例: gitは最初から入っています）
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash-completion \
    && apt-get clean && rm -rf /var/lib/apt/lists/*