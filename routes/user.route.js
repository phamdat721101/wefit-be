const express = require('express');
const router =express.Router();
const userCtrl = require('../controllers/user.controller');

router.route('/user').get(userCtrl.profile)
router.route('/vault_balance').get(userCtrl.vault_balance)
router.route('/user_portfolio').get(userCtrl.user_portfolio)
router.route('/subscribe_signal').post(userCtrl.subscribe)
router.route('/user_history').get(userCtrl.user_history)
router.route('/deposit_event').get(userCtrl.sub_deposit_event)

/*---Get User address--*/
router.route('/evm_adr').get(userCtrl.get_evm_address)
router.route('/apt_adr').get(userCtrl.get_apt_address)
router.route('/algo_adr').get(userCtrl.get_algo_address)

router.route("/register").post(userCtrl.register)
router.route("/profile/:profileId/follow").post(userCtrl.follow_profile)
router.route("/profile/:profileId/followers").get(userCtrl.get_list_follower)

module.exports = router