import { prisma } from "@/lib/prisma";

type ContactJsonBody = {
  name?: string;
  phone?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactJsonBody | null;

  const name = body?.name ?? "";
  const phone = body?.phone ?? "";

  if (!name.trim() || !phone.trim()) {
    return Response.json({ error: "Заполните все поля" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json({ error: "Сервер не настроен" }, { status: 500 });
  }

  const moscowTime = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  const text = `📩 Новая заявка с сайта\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🕐 Время: ${moscowTime}`;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    if (!tgRes.ok) {
      const tgError = await tgRes.json().catch(() => null);
      console.error("Telegram API error:", tgError);
      return Response.json(
        { error: "Ошибка отправки в Telegram" },
        { status: 502 }
      );
    }

    await prisma.lead.create({
      data: { name: name.trim(), phone: phone.trim() },
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json(
      { error: "Ошибка отправки в Telegram" },
      { status: 502 }
    );
  }
}
