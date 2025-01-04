import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { 
    params: { 
      profileId: string, 
    } 
  }
) {
  try {
    if (!params.profileId) {
      return new NextResponse("Profile id is required", { status: 400 });
    }

    const profile = await prismadb.profile.findFirst({
      where: {
        // categoryId: params.categoryId,
        // sizeId: params.sizeId,
        // kitchenId: params.kitchenId,
        // cuisineId: params.cuisineId,
        userId: params.profileId,
      },
      include: {
        // images: true,
        // category: true,
        // size: true,
        // kitchen: true,
        // cuisine: true,
        // color: true,
        projects: {
          include: {
            images: true,
          }
        },
      }
    });
  
    return NextResponse.json(profile);
  } catch (error) {
    console.log('[PROFILE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.profile.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.profile.update({
      where: {
        id: params.productId
      },
      data: {
        // colorId,
        // sizeId,
        // images: {
        //   deleteMany: {},
        // },
        // attribute: {
        //   deleteMany: {},
        // },
        // vitamins: {
        //   deleteMany: {},
        // },
        // minerals: {
        //   deleteMany: {},
        // },
        // orderItems: {
        //   deleteMany: {},
        // },
      },
    });

    const product = await prismadb.profile.delete({
      where: {
        id: params.productId
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // console.log('params: ', params);
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

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

    const profileByUserId = await prismadb.profile.findFirst({
      where: {
        userId
      }
    });

    if (!profileByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const profile = await prismadb.profile.update({
      where: {
        // id: params.profileId
        id: profileByUserId.id
      },
      data: {
        name,
        email,
        avatarUrl,
        description,
        githubUrl,
        linkedinUrl,
        // userId,
      },
    });
  
    return NextResponse.json(profile);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
