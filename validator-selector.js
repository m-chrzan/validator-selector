/*
 * USAGE: node validator-selector.js SEED VALIDATOR_GROUPS_JSON
 */

const fs = require('fs')

const shajs = require('sha.js')
const BigNumber = require('bignumber.js')

const sha256 = (x) => shajs('sha256').update(x).digest('hex')

// Number of validator groups to select
const numberToSelect = 8

if (process.argv.length !== 4) {
  console.log('Provide seed in hex and validator group list JSON file path')
  process.exit(1)
}

const seed = process.argv[2]
// Hash with an additional predetermined constant so we're not using the same
// exact seed as anyone else relying on the Celo randomness beacon
const randomizerSalt = sha256('stCELO validator selection')
let random = sha256(randomizerSalt + seed)

const validatorGroups = JSON.parse(fs.readFileSync(process.argv[3]))

const selectedValidatorGroups = []

for (let i = 0; i < numberToSelect; i ++) {
    const selectedIndex = (new BigNumber(random, 16)).modulo(validatorGroups.length).toNumber()
    selectedValidatorGroups.push(validatorGroups[selectedIndex])

    if (selectedIndex === validatorGroups.length - 1) {
        validatorGroups.pop()
    } else {
        validatorGroups[selectedIndex] = validatorGroups.pop()
    }

    random = sha256(random)
}

selectedValidatorGroups.forEach(validatoGroup => console.log(validatoGroup))
