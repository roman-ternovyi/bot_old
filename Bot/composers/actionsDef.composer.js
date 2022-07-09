const { Composer } = require('telegraf')
const { Users } = require('../../DB/connect.js');

const composer = new Composer()

composer.action('del', (ctx) => {
  try {
    ctx.answerCbQuery();
    ctx.deleteMessage();
  } catch (e) { }
});

composer.action('reset_yes', async (ctx) => {
  try {
    Users.findOneAndUpdate(
      { _id: ctx.from.id },
      {
        default_value: null,
        default_role: null,
      },
    )
      .clone()
      .then((value) => {
        ctx.answerCbQuery('Все пройшло успішно!\nЗаповни нові дані', { show_alert: true });
        ctx.scene.enter('defaultValueScene');
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) { }
});

composer.action('reset_no', (ctx) => {
  try {
    ctx.answerCbQuery();
    ctx.scene.enter('welcomeScene');
  } catch (error) { }
});

composer.action('cbScene', (ctx) => {
  try {
    ctx.answerCbQuery();
    ctx.scene.enter('cbScene');
  } catch (error) { }
});

module.exports = composer