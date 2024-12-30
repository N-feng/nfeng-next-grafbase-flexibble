import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    console.log('userId: ', userId);

    const body = await req.json();
    console.log('body: ', body);

    const { 
      images,
      title,
      description,
      liveSiteUrl,
      githubUrl,
      category
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const profileByUserId = await prismadb.profile.findFirst({
      where: {
        userId
      }
    });

    if (!profileByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.project.create({
      data: {
        title,
        description,
        liveSiteUrl,
        githubUrl,
        category,
        userId,
        profileId: profileByUserId.id,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
        
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
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

    // if (!params.storeId) {
    //   return new NextResponse("Store id is required", { status: 400 });
    // }

    const projects = await prismadb.project.findMany({
      where: {
        // userId: params.storeId,
        category: category,
      },
      include: {
        images: true,
        createdBy: true,
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
