import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import prismadb from '@/lib/prismadb';
import { ITEM_PER_PAGE } from '@/lib/settings';

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
    // const { userId } = auth();
    
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || undefined;
    const userId = searchParams.get('userId') || undefined;
    const page = parseInt(searchParams.get('page') || '1') || 1;
    console.log('page: ', page);

    // if (!params.storeId) {
    //   return new NextResponse("Store id is required", { status: 400 });
    // }

    const [data, count] = await prismadb.$transaction([
      prismadb.project.findMany({
        where: {
          // userId: params.userId,
          // userId: undefined,
          category: category,
          userId: userId
        },
        include: {
          images: true,
          createdBy: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),
      prismadb.project.count({ 
        where: {
          // userId: params.userId,
          // userId: undefined,
          category: category,
          userId: userId
        } 
      }),
    ]);
  
    return NextResponse.json({
      projectSearch: {
        edges: data.map((item: any) => ({
          node: {
            ...item,
            image: item.images[0].url,
          }
        })),
        pageInfo: {
          hasPreviousPage: page > 1,
          // hasNextPage: count > ITEM_PER_PAGE,
          hasNextPage: true,
          startCursor: 'fake',
          endCursor: 'fake',
        },
        count: count,
      }
    });
  } catch (error) {
    console.log('[PROJECTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
