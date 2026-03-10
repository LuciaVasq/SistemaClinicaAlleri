/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package org.itson.dominio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

/**
 *
 * @author Maryr
 */
@SpringBootApplication
@EntityScan(basePackages = "entidades")
public class Dominio {

    public static void main(String[] args) {
        SpringApplication.run(Dominio.class, args);
    }
}
