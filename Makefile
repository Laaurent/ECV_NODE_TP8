reset-db:
	rm correction-tp.db && \
	npx sequelize-cli db:migrate && \
	npx sequelize-cli db:seed:all --debug
