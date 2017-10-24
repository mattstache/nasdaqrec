module.exports = {
	port: 3001,
	apiUrl: 'http://localhost:3001',
	dbUrl: 'mongodb://localhost:5000/nasdaqrec',

	//secret for hashing tokens (randomly generated)
	secret: '37db92dce80c468c95b72248c1d49794',

	//initial admin email
	adminEmail: 'admin@admin.com',
	adminPassword: 'test'
};