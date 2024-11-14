// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { jwtConstants } from './auth.constant';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
// import { JwtStrategy } from './jwt.stratagy';
// import { UsersModule } from 'src/users/users.module';

// @Module({
//   controllers: [AuthController],
//   imports: [
//     UsersModule,
//     PassportModule,
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '60s' },
//     }),
//   ],
//   providers: [AuthService, LocalStrategy, JwtStrategy],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module'; 
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stratagy';
import { LocalStrategy } from './local.strategy';  
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,  // Make sure to set global: true to use the JWT strategy
      secret: 'jwt_secret_key',
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
