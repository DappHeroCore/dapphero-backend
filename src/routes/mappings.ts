import * as express from 'express';
export const mappings = express.Router();

mappings.get('/:id', (req, res) => { 

  const response = {
    'sample-node-key': {
      mapping: 'user-defined-key',
      formatting: {
        ethType: 'uint256',
        decimals: 2,
        units: 'ether'
      }
    }
  }
  res.send(response)

})
