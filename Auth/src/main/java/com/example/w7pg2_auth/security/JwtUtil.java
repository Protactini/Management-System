package com.example.w7pg2_auth.security;

import com.example.w7pg2_auth.constant.JwtConstant;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.ZonedDateTime;
import java.util.Date;

public class JwtUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtil.class);

    public static String generateToken(String subject, int validDuration, int id, String email, int roleId) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        JwtBuilder builder = Jwts.builder()
                .setSubject(subject)
                .claim("id", id)
                .claim("email", email)
                .claim("roleId", roleId)
                .setIssuedAt(now)
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(validDuration).toInstant()))
                .signWith(SignatureAlgorithm.HS256, JwtConstant.JWT_SIGNING_KEY);

        return builder.compact();
    }

    public static Claims getSubjectFromJwt(String token) {
        try {
            Claims subject = Jwts.parser().setSigningKey(JwtConstant.JWT_SIGNING_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            return subject;
        } catch(SignatureException e) {
            LOGGER.warn("Invalid Jwt Signature");
            return null;
        } catch(ExpiredJwtException e) {
            LOGGER.warn("Expired Jwt");
            return null;
        } catch(Exception e) {
            LOGGER.warn("Exception Parsing Jwt");
            return null;
        }
    }
}
