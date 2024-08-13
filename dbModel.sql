Create Type user_roles As ENUM('Edit', 'View', 'Remove', 'Display', 'Admin');
Create Type user_type As ENUM('Remote', 'Local');
Create Type status_flag As ENUM('Active', 'Disable');
Create Type report_type As ENUM('Alert', 'NCR', 'Deviation');

Create Table users(
	id SERIAL PRIMARY KEY,
	email VARCHAR(200) NOT NULL UNIQUE,
	password VARCHAR(200),
	roles user_roles[] Default '{"View"}',
	control user_type Default 'Remote',
	status status_flag Default 'Active'
);

Create Table qa_reports(
	id SERIAL PRIMARY KEY,
	creator INT,
	kind report_type NOT NULL,
	identifier VARCHAR(50),
	name VARCHAR(100) NOT NULL,
	description VARCHAR(500) NOT NULL,
	dtfrom DATE NOT NULL,
	dtto DATE NOT NULL,
	status status_flag Default 'Active',
	CONSTRAINT fk_user
		FOREIGN KEY(creator)
		REFERENCES users(id)
		ON DELETE CASCADE
);

Create Table resources(
	id SERIAL PRIMARY KEY,
	report INT,
	url	VARCHAR,
	name VARCHAR(100),
	CONSTRAINT fk_report
		FOREIGN KEY(report)
		REFERENCES qa_reports(id)
		ON DELETE CASCADE
);

Create Table areas(
	id SERIAL PRIMARY KEY,
	name VARCHAR(150),
	status status_flag Default 'Active'
);

Create Table report_areas(
	id SERIAL PRIMARY KEY,
	report INT,
	area INT,
	CONSTRAINT fk_report
		FOREIGN KEY (report)
		REFERENCES qa_reports(id)
		ON DELETE SET NULL,
	CONSTRAINT fk_area
		FOREIGN KEY (area)
		REFERENCES areas(id)
		ON DELETE SET NULL
);

Create Table tabs(
	id SERIAL PRIMARY KEY,
	header VARCHAR(100),
	url VARCHAR
);
