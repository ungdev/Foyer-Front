export default error => {
  if (!error) return 'Une erreur est survenue'
  switch (error) {
    case 'INVALID_FORM':
      return 'Formulaire incomplet'
    case 'NOT_ADMIN':
      return 'Vous devez avoir des droits administrateurs pour accéder à cette page'
    case 'ALREADY_ADMIN':
      return 'Cette personne est déjà administrateur'
    case 'INVALID_TOKEN':
      return 'Jeton invalide, veuillez vous reconnecter'
    case 'UNKNOWN':
      return 'Une erreur est survenue'
    case 'HAS_ORGAS':
      return 'Cette permanence ne peut accueillir des membres car elle possède au moins une association'
    case 'HAS_MEMBERS':
      return 'Cette permanence ne peut accueillir des associations car elle possède au moins un membre'
    case 'USER_ALREADY_IN_PERM':
      return 'Cet utilisateur fait déjà parti de la permanence'
    case 'ASSO_ALREADY_IN_PERM':
      return 'Cet association fait déjà parti de la permanence'
    case '':
      return 'Une erreur est survenue'
    case 'expired_token':
      return 'Votre session a expiré, veuillez vous reconnecter'
    default:
      return error
  }
}
