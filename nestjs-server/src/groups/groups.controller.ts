import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  async createGroup(@Body() group: CreateGroupDto) {
    return await this.groupsService.createGroup(group);
  }

  @Put(':groupId')
  async updateGroup(@Param('groupId') groupId: string, @Body() body: any) {
    return await this.groupsService.updateGroup(groupId, body);
  }

  @Delete(':groupId')
  async removeGroup(@Param('groupId') groupId: string) {
    return await this.groupsService.removeGroup(groupId);
  }

  @Get('products')
  async getProductsGroups() {
    return await this.groupsService.getProductsGroups();
  }
  @Get('services')
  async getServicesGroups() {
    return await this.groupsService.getProductsGroups();
  }
}
