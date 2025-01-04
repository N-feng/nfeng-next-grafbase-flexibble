import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { 
    params: {
      projectId: string,
      userId: string,
    } 
  }
) {
  try {
    if (!params.projectId) {
      return new NextResponse("Project id is required", { status: 400 });
    }

    const project = await prismadb.project.findUnique({
      where: {
        // categoryId: params.categoryId,
        // sizeId: params.sizeId,
        // kitchenId: params.kitchenId,
        // cuisineId: params.cuisineId,
        id: params.projectId,
        userId: params.userId,
      },
      include: {
        images: true,
        createdBy: true,
        // category: true,
        // size: true,
        // kitchen: true,
        // cuisine: true,
        // color: true,
      }
    });
  
    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECT_GET]', error);
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
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();

    const { 
      title,
      description, 
      liveSiteUrl, 
      githubUrl, 
      category, 
      images 
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.projectId) {
      return new NextResponse("Project id is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!category) {
      return new NextResponse("Category is required", { status: 400 });
    }

    // if (!colorId) {
    //   return new NextResponse("Color id is required", { status: 400 });
    // }

    // if (!sizeId) {
    //   return new NextResponse("Size id is required", { status: 400 });
    // }

    const profileByUserId = await prismadb.profile.findFirst({
      where: {
        userId
      }
    });

    if (!profileByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.project.update({
      where: {
        id: params.projectId
      },
      data: {
        title,
        description,
        // colorId,
        // sizeId,
        category,
        profileId: profileByUserId.id,
        images: {
          deleteMany: {},
        },
        liveSiteUrl,
        githubUrl,
      },
    });

    const project = await prismadb.project.update({
      where: {
        id: params.projectId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    })
  
    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
