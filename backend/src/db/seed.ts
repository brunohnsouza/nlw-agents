import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'
import { count } from 'console'

await reset(db, schema)

await seed(db, schema).refine(f => {
    return {
        rooms: {
            count: 5,
            columns: {
                name: f.companyName(),
                description: f.loremIpsum(),
            },
        },
        questions: {
            count: 20
        }
    }
})

await sql.end()

// biome-ignore lint/suspicious/noConsole: only for development
console.log('Database seeded successfully!')
