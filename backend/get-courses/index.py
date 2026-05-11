import json
import psycopg2
import os

def handler(event: dict, context) -> dict:
    """Возвращает список всех курсов с количеством материалов."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    schema = os.environ['MAIN_DB_SCHEMA']
    cur = conn.cursor()

    cur.execute("""
        SELECT
            c.course_id,
            c.title,
            c.description,
            COUNT(m.material_id) AS materials_count
        FROM {schema}.courses c
        LEFT JOIN {schema}.course_materials m ON c.course_id = m.course_id
        GROUP BY c.course_id, c.title, c.description
        ORDER BY c.course_id
    """.format(schema=schema))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    courses = [
        {
            'course_id': row[0],
            'title': row[1],
            'description': row[2],
            'materials_count': row[3],
        }
        for row in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'courses': courses}, ensure_ascii=False)
    }
