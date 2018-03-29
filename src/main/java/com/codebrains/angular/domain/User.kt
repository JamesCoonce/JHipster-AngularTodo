package com.codebrains.angular.domain

import com.codebrains.angular.config.Constants

import com.fasterxml.jackson.annotation.JsonIgnore
import org.apache.commons.lang3.StringUtils
import org.hibernate.annotations.BatchSize
import org.hibernate.validator.constraints.Email

import javax.persistence.*
import javax.validation.constraints.NotNull
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size
import java.io.Serializable
import java.util.HashSet
import java.util.Locale
import java.util.Objects
import java.time.Instant

/**
 * A user.
 */
@Entity
@Table(name = "jhi_user")
class User : AbstractAuditingEntity(), Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    // Lowercase the login before saving it in database
    @NotNull
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    var login: String? = null
        set(login) {
            field = StringUtils.lowerCase(login, Locale.ENGLISH)
        }

    @JsonIgnore
    @NotNull
    @Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60)
    var password: String? = null

    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    var firstName: String? = null

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    var lastName: String? = null

    @Email
    @Size(min = 5, max = 100)
    @Column(length = 100, unique = true)
    var email: String? = null

    @NotNull
    @Column(nullable = false)
    var activated = false

    @Size(min = 2, max = 6)
    @Column(name = "lang_key", length = 6)
    var langKey: String? = null

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    var imageUrl: String? = null

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    var activationKey: String? = null

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    var resetKey: String? = null

    @Column(name = "reset_date")
    var resetDate: Instant? = null

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "jhi_user_authority", joinColumns = { @JoinColumn(name = "user_id", referencedColumnName = "id") }, inverseJoinColumns = { @JoinColumn(name = "authority_name", referencedColumnName = "name") })
    @BatchSize(size = 20)
    var authorities: Set<Authority> = HashSet()

    override fun equals(o: Any?): Boolean {
        if (this === o) {
            return true
        }
        if (o == null || javaClass != o.javaClass) {
            return false
        }

        val user = o as User?
        return !(user!!.id == null || id == null) && id == user.id
    }

    override fun hashCode(): Int {
        return Objects.hashCode(id)
    }

    override fun toString(): String {
        return "User{" +
            "login='" + this.login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated='" + activated + '\'' +
            ", langKey='" + langKey + '\'' +
            ", activationKey='" + activationKey + '\'' +
            "}"
    }

    companion object {

        private const val serialVersionUID = 1L
    }
}
