import { getDb } from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

type LinkItem = {
  title: string;
  url: string;
};

type Body = {
  theme: string;
  name: string;
  links: LinkItem[];
  linkBackground: string;
  linkBorder: string;
  linkColor: string;
};

function generateHash(length = 7): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  const bytes = crypto.getRandomValues(new Uint8Array(length));

  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }

  return result;
}

async function generateUniqueHash(db: any): Promise<string> {
  let hash = '';
  let exists = true;

  for (let i = 0; i < 10; i++) {
    hash = generateHash(7);

    const found = await db.collection('linktree').findOne({ hash });

    if (!found) {
      exists = false;
      break;
    }
  }

  if (exists) {
    throw new Error('Не вдалося згенерувати унікальний hash');
  }

  return hash;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateBody(body: Partial<Body>) {
  if (!body) return 'Body відсутній';

  const {
    theme,
    name,
    links,
    linkBackground,
    linkBorder,
    linkColor,
  } = body;

  if (!theme || typeof theme !== 'string') return 'Фон обовʼязковий';
  if (!name || typeof name !== 'string') return "Ім'я обовʼязковий";

  if (!linkBackground || typeof linkBackground !== 'string')
    return 'Фон посилання обовʼязковий';

  if (!linkBorder || typeof linkBorder !== 'string')
    return 'Межа посилання обовʼязковий';

  if (!linkColor || typeof linkColor !== 'string')
    return 'Колір посилання обовʼязковий';

  if (name.length < 2 || name.length > 50)
    return 'Ім\'я має бути 2–50 символів';

  if (!Array.isArray(links)) return 'links має бути масивом';

  if (links.length > 5)
    return 'Максимум 5 посилань';
  if (links.length === 0)
    return 'Мінімум 1 посилання';

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
console.log(link)
    if (!link.title || typeof link.title !== 'string') {
      return `Ім'я в посиланні обовʼязкове`;
    }

    if (!link.url || typeof link.url !== 'string') {
      return `URL в посиланні обовʼязкове`;
    }

    if (!isValidUrl(link.url)) {
      return `URL в посиланні невалідне`;
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const db = await getDb();

    const body: Partial<Body> = await request.json();

    const error = validateBody(body);
    if (error) {
      return NextResponse.json(
        { error },
        { status: 400 }
      );
    }

    const {
      theme,
      name,
      links,
      linkBackground,
      linkBorder,
      linkColor,
    } = body as Body;

    const hash = await generateUniqueHash(db);

    const result = await db.collection('linktree').insertOne({
      hash,
      theme,
      name,
      links,
      linkBackground,
      linkBorder,
      linkColor,
      createdAt: new Date(),
    });

    return NextResponse.json({
      insertedId: result.insertedId,
      hash,
    });

  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}