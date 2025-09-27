import { Controller, UseGuards, Get, Patch, Body, Req, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'auth/dto/user-response.dto';
import { ErrorResponseDto } from 'auth/dto/error-response.dt';

@ApiTags('users')
@ApiBearerAuth() 
@Controller('api/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorResponseDto })
  async getProfile(@Req() req) {
    return this.usersService.findById(req.user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile (Requires role: user or admin)' }) 
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorResponseDto })
  async updateProfile(@Req() req, @Body() body: { name?: string; email?: string }) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @Patch('me/photo')
  @ApiOperation({ summary: 'Update current user profile (Requires role: user or admin)' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/profile',
      filename: (req, file, cb) => {
        const user = req.user as { id: string }; 
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
      }
    })
  }))
  @ApiConsumes('multipart/form-data') // ✅ tells Swagger this endpoint consumes files
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // ✅ binary = file upload
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Profile photo uploaded', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorResponseDto })
  async uploadPhoto(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.updateProfilePhoto(req.user.id, `/uploads/profile/${file.filename}`);
  }

  @Delete('me/photo')
  async deletePhoto(@Req() req) {
    return this.usersService.deleteProfilePhoto(req.user.id);
  }
}
