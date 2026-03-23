package org.itson.comunicacion;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 *
 * @author victoria
 */
@SpringBootApplication(scanBasePackages = {"controllers", "org.itson", "implementaciones", "IMappers"})
@EnableJpaRepositories(basePackages = "org.itson.datos.implementaciones")
@EntityScan(basePackages = "org.itson.dominio.entidades")
public class Comunicacion implements  CommandLineRunner{

    public static void main(String[] args) {
        SpringApplication.run(Comunicacion.class, args);
        
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Servidor springboot corriendo i guess");
    }
}
