import { Body, ConflictException, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    

constructor(
  @InjectRepository(User)
  private userRepository: Repository<User>,

  private jwtService: JwtService,
) {}
    
    async signup(dto: SignupDto) {

  const existingUser =
    await this.userRepository.findOne({
      where: {
        email: dto.email
      }
    });

  if (existingUser) {
    throw new ConflictException(
      'User already exists'
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      dto.password,
      10
    );

  const user =
    this.userRepository.create({
      ...dto,
      password: hashedPassword
    });

  await this.userRepository.save(user);

  return {
    message:
      'User created successfully'
  };
}
async login(loginDto: LoginDto) {

  const user = await this.userRepository.findOne({
    where: {
      email: loginDto.email,
    },
  });

  if (!user) {
    throw new UnauthorizedException(
      'Invalid credentials',
    );
  }

  const isPasswordMatch =
    await bcrypt.compare(
      loginDto.password,
      user.password,
    );

  if (!isPasswordMatch) {
    throw new UnauthorizedException(
      'Invalid credentials',
    );
  }

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken =
    await this.jwtService.signAsync(
      payload,
    );

  return {
    access_token: accessToken,
  };
}
}
