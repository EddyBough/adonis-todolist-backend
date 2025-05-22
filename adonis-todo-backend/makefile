PACKAGE_MANAGER ?= pnpm
X_MANAGER ?= pnpx

.DEFAULT_GOAL := dev

## —— Backend AdonisJS ————————————————————————————
help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Installe les dépendances
	$(PACKAGE_MANAGER) install

dev: ## Lance le serveur en dev
	node ace serve --watch

migrate: ## Applique les migrations
	node ace migration:run

rollback: ## Annule la dernière migration
	node ace migration:rollback

seed: ## Seed la base de données (si tu ajoutes des seeders)
	node ace db:seed

lint: ## Lint du projet
	$(PACKAGE_MANAGER) lint || true

check: lint build ## Vérifie lint + build

## —— Git ———————————————————————————————————————
msg ?= $(shell git branch --show-current | sed -E 's/^([0-9]+)-([^-]+)-(.+)/\2: \#\1 \3/' | sed "s/-/ /g")

auto-commit: ## Auto commit intelligent
	@if [ "$(shell git status --porcelain | wc -l)" -gt 0 ]; then \
		git add .; \
		git commit -m "$(msg)" || true; \
	fi

push: auto-commit ## Commit et push vers le dépôt
	git pull origin $(shell git branch --show-current) --rebase
	git push origin $(shell git branch --show-current)

git-rebase-main: ## Rebase sur main
	git pull origin main --rebase

git-clean-branches: ## Supprime les branches locales mergées
	@git remote prune origin
	(git branch --merged | egrep -v "(^\*|main|master|dev)" | xargs git branch -d) || true
