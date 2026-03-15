/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import org.itson.dominio.entidades.Administrador;
import org.itson.dominio.entidades.Recepcionista;
import org.itson.dto.UsuarioDTO;
import org.mapstruct.Mapper;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    public UsuarioDTO toDTOUsuario(Recepcionista recepcionsita);
    public Recepcionista toRecepcionista(UsuarioDTO usuario);
    public UsuarioDTO toDTOAdministrador(Administrador administrador);
    public Administrador toAdministrador(UsuarioDTO usuario);
}
