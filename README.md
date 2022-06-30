# Validator Selector

A tool to use at launch time of [stCELO](https://github.com/celo-org/staked-celo) to fairly select a list of 8 random validator groups that the stCELO system will vote for.

The shortlist of validator groups to select from should be provided as a list of their addresses, sorted numerically.

The seed will come from the Celo on-chain randomness beacon, and should be provided to the script as an all lowercase hex string without the leading `0x`.

See the [forum post](https://forum.celo.org/t/stcelo-launch-on-friday-feedback-on-our-plan-for-validator-election/3897) for details.
