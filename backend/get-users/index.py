import json
import psycopg2
import os
# psycopg2-binary required

def handler(event: dict, context) -> dict:
    """Возвращает список всех сотрудников с их отделами из таблицы users."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    schema = os.environ['MAIN_DB_SCHEMA']

    cur = conn.cursor()
    cur.execute(f"""
        SELECT
            u.user_id,
            u.full_name,
            u.login,
            u.role,
            u.department_id,
            d.name AS department_name
        FROM {schema}.users u
        LEFT JOIN {schema}.departments d ON u.department_id = d.department_id
        ORDER BY u.user_id
    """)

    rows = cur.fetchall()
    cur.close()
    conn.close()

    users = [
        {
            'user_id': row[0],
            'full_name': row[1],
            'login': row[2],
            'role': row[3],
            'department_id': row[4],
            'department_name': row[5],
        }
        for row in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'users': users}, ensure_ascii=False)
    }