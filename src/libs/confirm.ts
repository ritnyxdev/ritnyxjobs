import { Ads } from '../models/ads.model.js'
import { Markup, Context } from 'telegraf'

export async function menuTasdiqlash(ctx: Context) {
  let ads = ''
  let photo_path = ''
  let doc_path = ''
  let file_name = ''
  await Ads.findOne({
    where: { user_id: `${ctx?.from?.id}` },
    order: [['createdAt', 'DESC']],
  }).then(async (elon) => {
    if (elon) {
      const {
        category,
        name,
        phone,
        age,
        tg_link,
        call_time,
        technology,
        degree,
        work_place,
        work_time,
        region,
        info,
        price,
      } = elon.dataValues
      if (category === 'hodim')
        ads = `<b>HODIM QIDIRILMOQDA:</b>\n\nš¦ Tashkilot: ${name}\nš Telefon: ${phone}\nāļø Telegram: @${tg_link}\nā° Murojaat vaqti: ${call_time}\nš Bilim-ko'nikmalar: ${technology}\nš Daraja: ${degree}\nā³ Ish vaqti: ${work_time}\nšµ Maosh: ${price}\nš Hudud: ${region}\nš Qo'shimcha ma'lumot: ${info}`
      else if (category === 'ustoz')
        ads = `<b>USTOZ QIDIRILMOQDA:</b>\n\nš§āš» Shogird: ${name}\nš Yoshi: ${age}\nš Telefoni: ${phone}\nāļø Telegrami: @${tg_link}\nā° Murojaat vaqti: ${call_time}\nš Talab qilinayotgan bilim-ko'nikmalar: ${technology}\nš Daraja: ${degree}\nš¦ Hozirgi o'qish-ish joyi: ${work_place}\nšµ Shogirdlik badali: ${price}\nš Hudud: ${region}\nš Xohish-istak va maqsadi: ${info}`
      else if (category === 'shogird')
        ads = `<b>SHOGIRD QIDIRILMOQDA:</b>\n\nš§āš» Ustoz: ${name}\nš Yoshi: ${age}\nš Telefoni: ${phone}\nāļø Telegrami: @${tg_link}\nā° Murojaat vaqti: ${call_time}\nš Bilim-ko'nikmalar: ${technology}\nš Daraja: ${degree}\nš¦ Hozirgi o'qish-ish joyi: ${work_place}\nšµ Shogirdlik badali: ${price}\nš Hudud: ${region}\nš Xohish-istak va maqsadi: ${info}`
      else if (category === 'sherik')
        ads = `<b>SHERIK QIDIRILMOQDA:</b>\n\nš§āš» Sherik: ${name}\nš Yoshi: ${age}\nš Telefoni: ${phone}\nāļø Telegrami: @${tg_link}\nā° Murojaat vaqti: ${call_time}\nš Bilim-ko'nikmalar: ${technology}\nš Daraja: ${degree}\nš¦ Hozirgi o'qish-ish joyi: ${work_place}\nšµ Sheriklik badali: ${price}\nš Hudud: ${region}\nš Xohish-istak va maqsadi: ${info}`
      else if (category === 'uquv_markazi')
        ads = `<b>O'QUV MARKAZI QIDIRILMOQDA:</b>\n\nš§āš» O'quvchi: ${name}\nš Yoshi: ${age}\nš Telefoni: ${phone}\nāļø Telegrami: @${tg_link}\nā° Murojaat vaqti: ${call_time}\nš Bilim-ko'nikmalar: ${technology}\nš Darajasi: ${degree}\nš¦ Hozirgi o'qish-ish joyi: ${work_place}\nā³ Ma'qul o'qish vaqti: ${work_time}\nšµ To'lov imkoniyati: ${price}\nš Hudud: ${region}\nš Xohish-istak va maqsadi: ${info}`
      else if (category === 'uquvchi')
        ads = `<b>O'QUV MARKAZI TAKLIF QILADI:</b>\n\nš¦ O'quv markazi: ${name}\nš Telefoni: ${phone}\nāļø Telegrami: @${tg_link}\nā° Murojaat vaqti: ${call_time}\nš Kurs nomi: ${technology}\nš Davomiyligi: ${degree}\nšµ Narxi: ${price}\nš Manzili: ${region}\nš Mo'ljal: ${work_place}\nš Qo'shimcha ma'lumot: ${info}`
      else if (category === 'loyiha')
        ads = `<b>LOYIHA QIDIRILMOQDA:</b>\n\nš§āš» Mutaxassis: ${name}\nš Yoshi: ${age}\nš Telefoni: ${phone}\nāļø Telegrami: @${tg_link}\nā° Murojaat vaqti: ${call_time}\nš Bilim-ko'nikmalari: ${technology}\nš Darajasi: ${degree}\nš¦ Hozirgi o'qish-ish joyi: ${work_place}\nš Ko'zlagan hududi: ${region}\nš Xohish-istak va maqsadi: ${info}`
      else if (category === 'erkin') {
        ads = `${info}`
        if (name === 'photo') photo_path = String(technology)
        if (name === 'doc') {
          doc_path = String(technology)
          file_name = String(degree)
        }
      } else
        ads = `<b>ISH QIDIRILMOQDA:</b>\n\nš§āš» Nomzod: ${name}\nš Yoshi: ${age}\nš Telefoni: ${phone}\nāļø Telegrami: @${tg_link}\nā° Murojaat vaqti: ${call_time}\nš Bilim-ko'nikmalari: ${technology}\nš Darajasi: ${degree}\nš¦ Hozirgi o'qish-ish joyi: ${work_place}\nā³ Ma'qul ish vaqti: ${work_time}\nšµ Ko'zlagan maoshi: ${price}\nš Ko'zlagan hududi: ${region}\nš Xohish-istak va maqsadi: ${info}`
      await elon.update({ elon_state: 'finish' })
    }
  })
  if (photo_path != '') {
    return await ctx.replyWithPhoto(
      { url: `${photo_path}` },
      {
        caption: ads,
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['ā Tasdiqlash', 'ā Bekor qilish'],
          ['š  Bosh sahifa', "š E'lon berish tartibi"],
        ])
          .oneTime()
          .resize(),
      },
    )
  } else if (doc_path != '') {
    return await ctx.replyWithDocument(
      { url: `${doc_path}`, filename: file_name },
      {
        caption: ads,
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['ā Tasdiqlash', 'ā Bekor qilish'],
          ['š  Bosh sahifa', "š E'lon berish tartibi"],
        ])
          .oneTime()
          .resize(),
      },
    )
  } else {
    return await ctx.reply(`${ads}\n\n<b>E'lon ma'qul bo'lsa "Tasdiqlash" tugmasini bosing!</b>`, {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        ['ā Tasdiqlash', 'ā Bekor qilish'],
        ['š  Bosh sahifa', "š E'lon berish tartibi"],
      ])
        .oneTime()
        .resize(),
    })
  }
}

export async function menuTasdiqlashRus(ctx: Context) {
  let ads = ''
  let photo_path = ''
  let doc_path = ''
  let file_name = ''
  await Ads.findOne({
    where: { user_id: `${ctx?.from?.id}` },
    order: [['createdAt', 'DESC']],
  }).then(async (elon) => {
    if (elon) {
      const {
        category,
        name,
        phone,
        age,
        tg_link,
        call_time,
        technology,
        degree,
        work_place,
        work_time,
        region,
        info,
        price,
      } = elon.dataValues
      if (category === 'hodim')
        ads = `<b>ŠŠŠŠ”Š Š”ŠŠ¢Š Š£ŠŠŠŠŠ:</b>\n\nš¦ ŠŃŠ³Š°Š½ŠøŠ·Š°ŃŠøŃ: ${name}\nš Š¢ŠµŠ»ŠµŃŠ¾Š½: ${phone}\nāļø Š¢ŠµŠ»ŠµŠ³ŃŠ°Š¼: @${tg_link}\nā° ŠŃŠµŠ¼Ń Š¾Š±ŃŠ°ŃŠ½Š¾Š¹ ŃŠ²ŃŠ·Šø: ${call_time}\nš ŠŠ½Š°Š½ŠøŃ Šø Š½Š°Š²ŃŠŗŠø: ${technology}\nš Š£ŃŠ¾Š²ŠµŠ½Ń: ${degree}\nā³ ŠŃŠµŠ¼Ń ŃŠ°Š±Š¾ŃŃ: ${work_time}\nšµ ŠŃŠµŠ“Š»Š°Š³Š°ŠµŠ¼Š°Ń Š·Š°ŃŠæŠ»Š°ŃŠ°: ${price}\nš Š ŠµŠ³ŠøŠ¾Š½: ${region}\nš ŠŠ¾Šæ. ŠøŠ½ŃŠ¾ŃŠ¼Š°ŃŠøŃ: ${info}`
      else if (category === 'ustoz')
        ads = `<b>ŠŠŠŠ”Š ŠŠŠ”Š¢ŠŠŠŠŠŠ:</b>\n\nš§āš» Š£ŃŠµŠ½ŠøŠŗ: ${name}\nš ŠŠ¾Š·ŃŠ°ŃŃ: ${age}\nš Š¢ŠµŠ»ŠµŃŠ¾Š½: ${phone}\nāļø Š¢ŠµŠ»ŠµŠ³ŃŠ°Š¼: @${tg_link}\nā° ŠŃŠµŠ¼Ń Š¾Š±ŃŠ°ŃŠ½Š¾Š¹ ŃŠ²ŃŠ·Šø: ${call_time}\nš Š¢ŃŠµŠ±ŃŠµŠ¼ŃŠµ Š·Š½Š°Š½ŠøŃ Šø Š½Š°Š²ŃŠŗŠø: ${technology}\nš Š£ŃŠ¾Š²ŠµŠ½Ń: ${degree}\nš¦ Š¢ŠµŠŗŃŃŠµŠµ Š¼ŠµŃŃŠ¾ ŃŠ°Š±Š¾ŃŃ/ŃŃŠµŠ±Ń: ${work_place}\nšµ ŠŠ»Š°ŃŠ° Š·Š° Š¾Š±ŃŃŠµŠ½ŠøŠµ: ${price}\nš Š ŠµŠ³ŠøŠ¾Š½: ${region}\nš ŠŠ¾Šæ. ŠøŠ½ŃŠ¾ŃŠ¼Š°ŃŠøŃ: ${info}`
      else if (category === 'shogird')
        ads = `<b>ŠŠŠŠ”Š Š£Š§ŠŠŠŠŠ:</b>\n\nš§āš» ŠŠ°ŃŃŠ°Š²Š½ŠøŠŗ: ${name}\nš ŠŠ¾Š·ŃŠ°ŃŃ: ${age}\nš Š¢ŠµŠ»ŠµŃŠ¾Š½: ${phone}\nāļø Š¢ŠµŠ»ŠµŠ³ŃŠ°Š¼: @${tg_link}\nā° ŠŃŠµŠ¼Ń Š¾Š±ŃŠ°ŃŠ½Š¾Š¹ ŃŠ²ŃŠ·Šø: ${call_time}\nš ŠŠ½Š°Š½ŠøŃ Šø Š½Š°Š²ŃŠŗŠø: ${technology}\nš Š£ŃŠ¾Š²ŠµŠ½Ń: ${degree}\nš¦ Š¢ŠµŠŗŃŃŠµŠµ Š¼ŠµŃŃŠ¾ ŃŠ°Š±Š¾ŃŃ/ŃŃŠµŠ±Ń: ${work_place}\nšµ ŠŠ»Š°ŃŠ° Š·Š° Š¾Š±ŃŃŠµŠ½ŠøŠµ: ${price}\nš Š ŠµŠ³ŠøŠ¾Š½: ${region}\nš ŠŠ¾Šæ. ŠøŠ½ŃŠ¾ŃŠ¼Š°ŃŠøŃ: ${info}`
      else if (category === 'sherik')
        ads = `<b>ŠŠŠŠ”Š ŠŠŠ Š¢ŠŠŠ Š:</b>\n\nš§āš» ŠŠ°ŃŃŠ½ŠµŃ: ${name}\nš ŠŠ¾Š·ŃŠ°ŃŃ: ${age}\nš Š¢ŠµŠ»ŠµŃŠ¾Š½: ${phone}\nāļø Š¢ŠµŠ»ŠµŠ³ŃŠ°Š¼: @${tg_link}\nā° ŠŃŠµŠ¼Ń Š¾Š±ŃŠ°ŃŠ½Š¾Š¹ ŃŠ²ŃŠ·Šø: ${call_time}\nš ŠŠ½Š°Š½ŠøŃ Šø Š½Š°Š²ŃŠŗŠø: ${technology}\nš Š£ŃŠ¾Š²ŠµŠ½Ń: ${degree}\nš¦ Š¢ŠµŠŗŃŃŠµŠµ Š¼ŠµŃŃŠ¾ ŃŠ°Š±Š¾ŃŃ/ŃŃŠµŠ±Ń: ${work_place}\nšµ ŠŠ°ŃŃŠ½ŠµŃŃŠŗŠøŠ¹ Š²Š·Š½Š¾Ń: ${price}\nš Š ŠµŠ³ŠøŠ¾Š½: ${region}\nš ŠŠ¾Šæ. ŠøŠ½ŃŠ¾ŃŠ¼Š°ŃŠøŃ: ${info}`
      else if (category === 'uquv_markazi')
        ads = `<b>ŠŠŠŠ”Š Š£Š§ŠŠŠŠŠŠ Š¦ŠŠŠ¢Š Š:</b>\n\nš§āš» Š”Š»ŃŃŠ°ŃŠµŠ»Ń: ${name}\nš ŠŠ¾Š·ŃŠ°ŃŃ: ${age}\nš Š¢ŠµŠ»ŠµŃŠ¾Š½: ${phone}\nāļø Š¢ŠµŠ»ŠµŠ³ŃŠ°Š¼: @${tg_link}\nā° ŠŃŠµŠ¼Ń Š¾Š±ŃŠ°ŃŠ½Š¾Š¹ ŃŠ²ŃŠ·Šø: ${call_time}\nš ŠŠ½Š°Š½ŠøŃ Šø Š½Š°Š²ŃŠŗŠø: ${technology}\nš Š£ŃŠ¾Š²ŠµŠ½Ń: ${degree}\nš¦ Š¢ŠµŠŗŃŃŠµŠµ Š¼ŠµŃŃŠ¾ ŃŠ°Š±Š¾ŃŃ/ŃŃŠµŠ±Ń: ${work_place}\nā³ Š£Š“Š¾Š±Š½ŃŠ¹ ŃŠ¾ŃŠ¼Š°Ń Šø Š²ŃŠµŠ¼Ń: ${work_time}\nšµ ŠŠ»Š°ŃŠµŠ¶ŠµŃŠæŠ¾ŃŠ¾Š±Š½Š¾ŃŃŃ: ${price}\nš Š ŠµŠ³ŠøŠ¾Š½: ${region}\nš ŠŠ¾Šæ. ŠøŠ½ŃŠ¾ŃŠ¼Š°ŃŠøŃ: ${info}`
      else if (category === 'uquvchi')
        ads = `<b>Š£Š§ŠŠŠŠ«Š Š¦ŠŠŠ¢Š  ŠŠ ŠŠŠŠŠØŠŠŠ¢:</b>\n\nš¦ Š£Š§ŠŠŠŠ«Š Š¦ŠŠŠ¢Š : ${name}\nš Š¢ŠµŠ»ŠµŃŠ¾Š½: ${phone}\nāļø Š¢ŠµŠ»ŠµŠ³ŃŠ°Š¼: @${tg_link}\nā° ŠŃŠµŠ¼Ń Š¾Š±ŃŠ°ŃŠ½Š¾Š¹ ŃŠ²ŃŠ·Šø: ${call_time}\nš ŠŠ°Š·Š²Š°Š½ŠøŠµ ŠŗŃŃŃŠ°: ${technology}\nš ŠŃŠ¾Š“Š¾Š»Š¶ŠøŃŠµŠ»ŃŠ½Š¾ŃŃŃ: ${degree}\nšµ Š”ŃŠ¾ŠøŠ¼Š¾ŃŃŃ ŠŗŃŃŃŠ°: ${price}\nš ŠŠ“ŃŠµŃ: ${region}\nš ŠŃŠøŠµŠ½ŃŠøŃ: ${work_place}\nš ŠŠ¾Šæ. ŠøŠ½ŃŠ¾ŃŠ¼Š°ŃŠøŃ: ${info}`
      else if (category === 'loyiha')
        ads = `<b>ŠŠŠŠ”Š ŠŠ ŠŠŠŠ¢Š:</b>\n\nš§āš» Š”ŠæŠµŃŠøŠ°Š»ŠøŃŃ: ${name}\nš ŠŠ¾Š·ŃŠ°ŃŃ: ${age}\nš Š¢ŠµŠ»ŠµŃŠ¾Š½: ${phone}\nāļø Š¢ŠµŠ»ŠµŠ³ŃŠ°Š¼: @${tg_link}\nā° ŠŃŠµŠ¼Ń Š¾Š±ŃŠ°ŃŠ½Š¾Š¹ ŃŠ²ŃŠ·Šø: ${call_time}\nš ŠŠ½Š°Š½ŠøŃ Šø Š½Š°Š²ŃŠŗŠø: ${technology}\nš Š£ŃŠ¾Š²ŠµŠ½Ń: ${degree}\nš¦ Š¢ŠµŠŗŃŃŠµŠµ Š¼ŠµŃŃŠ¾ ŃŠ°Š±Š¾ŃŃ/ŃŃŠµŠ±Ń: ${work_place}\nš Š ŠµŠ³ŠøŠ¾Š½: ${region}\nš ŠŠ¾Šæ. ŠøŠ½ŃŠ¾ŃŠ¼Š°ŃŠøŃ: ${info}`
      else if (category === 'erkin') {
        ads = `${info}`
        if (name === 'photo') photo_path = String(technology)
        if (name === 'doc') {
          doc_path = String(technology)
          file_name = String(degree)
        }
      } else
        ads = `<b>ŠŠŠŠ”Š Š ŠŠŠŠ¢Š«:</b>\n\nš§āš» ŠŠ°Š½Š“ŠøŠ“Š°Ń: ${name}\nš ŠŠ¾Š·ŃŠ°ŃŃ: ${age}\nš Š¢ŠµŠ»ŠµŃŠ¾Š½: ${phone}\nāļø Š¢ŠµŠ»ŠµŠ³ŃŠ°Š¼: @${tg_link}\nā° ŠŃŠµŠ¼Ń Š¾Š±ŃŠ°ŃŠ½Š¾Š¹ ŃŠ²ŃŠ·Šø: ${call_time}\nš ŠŠ½Š°Š½ŠøŃ Šø Š½Š°Š²ŃŠŗŠø: ${technology}\nš Š£ŃŠ¾Š²ŠµŠ½Ń: ${degree}\nš¦ Š¢ŠµŠŗŃŃŠµŠµ Š¼ŠµŃŃŠ¾ ŃŠ°Š±Š¾ŃŃ/ŃŃŠµŠ±Ń: ${work_place}\nā³ Š£Š“Š¾Š±Š½ŃŠ¹ ŃŠ¾ŃŠ¼Š°Ń Šø Š²ŃŠµŠ¼Ń: ${work_time}\nšµ Š¦ŠµŠ»ŠµŠ²Š°Ń Š·Š°ŃŠæŠ»Š°ŃŠ°: ${price}\nš ŠŃŠµŠ“ŠæŠ¾ŃŠøŃŠ°ŠµŠ¼ŃŠ¹ ŃŠµŠ³ŠøŠ¾Š½: ${region}\nš ŠŠ¾Šæ. ŠøŠ½ŃŠ¾ŃŠ¼Š°ŃŠøŃ: ${info}`
      await elon.update({ elon_state: 'finish' })
    }
  })

  if (photo_path != '') {
    return await ctx.replyWithPhoto(
      { url: `${photo_path}` },
      {
        caption: ads,
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['ā ŠŠ¾Š“ŃŠ²ŠµŃŠ“ŠøŃŃ', 'ā ŠŃŠ¼ŠµŠ½ŠøŃŃ ŠæŃŠ±Š»ŠøŠŗŠ°ŃŠøŃ'],
          ['š  ŠŠ»Š°Š²Š½Š°Ń ŃŃŃŠ°Š½ŠøŃŠ°', 'š Š ŠµŠŗŠ»Š°Š¼Š½Š°Ń ŠæŃŠ¾ŃŠµŠ“ŃŃŠ°'],
        ])
          .oneTime()
          .resize(),
      },
    )
  } else if (doc_path != '') {
    return await ctx.replyWithDocument(
      { url: `${doc_path}`, filename: file_name },
      {
        caption: ads,
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['ā ŠŠ¾Š“ŃŠ²ŠµŃŠ“ŠøŃŃ', 'ā ŠŃŠ¼ŠµŠ½ŠøŃŃ ŠæŃŠ±Š»ŠøŠŗŠ°ŃŠøŃ'],
          ['š  ŠŠ»Š°Š²Š½Š°Ń ŃŃŃŠ°Š½ŠøŃŠ°', 'š Š ŠµŠŗŠ»Š°Š¼Š½Š°Ń ŠæŃŠ¾ŃŠµŠ“ŃŃŠ°'],
        ])
          .oneTime()
          .resize(),
      },
    )
  } else {
    return await ctx.reply(`${ads}\n\n<b>ŠŃŠ»Šø Š²ŃŠµ ŠŠ, Š½Š°Š¶Š¼ŠøŃŠµ Ā«ŠŠ¾Š“ŃŠ²ŠµŃŠ“ŠøŃŃĀ»</b>`, {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        ['ā ŠŠ¾Š“ŃŠ²ŠµŃŠ“ŠøŃŃ', 'ā ŠŃŠ¼ŠµŠ½ŠøŃŃ ŠæŃŠ±Š»ŠøŠŗŠ°ŃŠøŃ'],
        ['š  ŠŠ»Š°Š²Š½Š°Ń ŃŃŃŠ°Š½ŠøŃŠ°', 'š Š ŠµŠŗŠ»Š°Š¼Š½Š°Ń ŠæŃŠ¾ŃŠµŠ“ŃŃŠ°'],
      ])
        .oneTime()
        .resize(),
    })
  }
}
