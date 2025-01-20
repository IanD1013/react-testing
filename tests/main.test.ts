import { describe, it } from 'vitest'
import { db } from './mocks/db'

describe('group', () => {
    it('should', () => {
        const product = db.product.create()

        console.log(product)
    })
})