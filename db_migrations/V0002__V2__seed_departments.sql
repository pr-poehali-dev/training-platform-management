INSERT INTO t_p80947900_training_platform_ma.departments (department_id, name) VALUES
(1, 'Администрация'),
(2, 'Бухгалтерия'),
(3, 'Коммерческий отдел'),
(4, 'Отдел ИБ'),
(5, 'Отдел кадров'),
(6, 'Склад'),
(7, 'Транспортный отдел'),
(8, 'Юридический отдел');

SELECT setval('t_p80947900_training_platform_ma.departments_department_id_seq', 8);
