import express from 'express'

export const mappingsRouter = express.Router()

const mappingsDB = [
  {
    'dapphero-defined-node-key': {
      mapping: 'user-defined-key',
      formatting: {
        ethType: 'uint256',
        encoding: 'wei',
        output: 'float',
        decimals: 2,
        units: 'ether'
      }
    }
  },
  {
    'dapphero-defined-node-key2': {
      mapping: 'user-defined-key2',
      formatting: {
        ethType: 'byte32',
        encoding: 'byte32',
        output: 'utf-16'
      }
    }
  },
  {
    'dapphero-defined-node-key3': {
      mapping: 'user-defined-key3',
      formatting: {
        ethType: 'byte32',
        encoding: 'byte32',
        output: 'byte32'
      }
    }
  },
]

mappingsRouter.get('/:id', (req, res) => {
  const mappingIndex = Number.parseInt(req.params.id)
  if (mappingIndex > mappingsDB.length - 1) {
    res.send('That ID does not exist')
  }
  const response = mappingsDB[mappingIndex]
  res.send(response)

})

mappingsRouter.post('/:id', (req, res) => {
  mappingsDB[req.params.id] = req.body
  res.send('Successfully inserted')
})
