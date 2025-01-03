import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { 
      name,
      email,
      avatarUrl,
      description,
      githubUrl,
      linkedinUrl,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!avatarUrl) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const profile = await prismadb.profile.create({
      data: {
        name,
        email,
        avatarUrl,
        description,
        githubUrl,
        linkedinUrl,
        userId,
      },
    });
  
    return NextResponse.json(profile);
  } catch (error) {
    console.log('[PROFILE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { 
    params: { 
      category: string,
      sizeId: string,
      kitchenId: string,
      cuisineId: string,
      storeId: string,
    } 
  },
) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || undefined;
    console.log('category: ', category);

    // if (!params.storeId) {
    //   return new NextResponse("Store id is required", { status: 400 });
    // }

    const projects = await prismadb.project.findMany({
      where: {
        userId: params.storeId,
        category,
      },
      include: {
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(projects);
  } catch (error) {
    console.log('[PROJECTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
