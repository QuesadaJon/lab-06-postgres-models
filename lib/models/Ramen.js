const pool = require('../utils/pool');

module.exports = class Ramen {
    id;
    brand;
    type;
    flavor

    constructor(row) {
        this.id = row.id;
        this.brand = row.brand;
        this.type = row.type;
        this.flavor = row.flavor;
    }

    static async insert({ brand, type, flavor }) {
        const { rows } = await pool.query(
            'INSERT INTO ramen (brand, type, flavor) VALUES($1, $2, $3) RETURNING *',
            [brand, type, flavor]
        );

        return new Ramen(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM ramen WHERE id=$1',
            [id]
        );

        if(!rows[0]) throw new Error(`No ramen with id ${id}`);
        return new Ramen(rows[0]);
    }

    static async update(id, { brand, type, flavor }) {
        const { rows } = await pool.query(
            `UPDATE ramen
                SET brand =$1,
                    type=$2,
                    flavor=$3
                WHERE id=$4
                RETURNING *`,
            [brand, type, flavor, id]
        );

        if(!rows[0]) throw new Error(`No ramen with id ${id} exists`);
        return new Ramen(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM ramen WHERE id=$1 RETURNING *',
            [id]
        );

        if(!rows[0]) throw new Error(`No ramen with id ${id} exists`);
        return `ramen with id of ${id} has been deleted`;
    }
};
